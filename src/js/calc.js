let init = [0];                 //存放  number base
let combin = [];                //存放  base操作符  与  结合后的数
let num_init = ['+', 0];        //存放  number
let former_type = undefined;    //number, base, special, undefined
let content = { show_prev: '', show_curr: '' };
let form = { show_prev: '', show_curr: '' };
let continueif = false;
let checkflag = false;

let combinNum = array => array.reduce((total, current) => total += current, '') * 1;

let formNum = str => {
    if (!isNaN(str)) {
        let sttr = (str + '').split('.');
        sttr[0] = sttr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        str = sttr.join('.');
    }
    return str;
}

let dotNum = str => {
    if (!isNaN(str)) {
        let sstr = (str + '').split('.');
        sstr[0] = 1 * sstr[0];
        str = sstr.join('.');
    }
    return str;
}

let storageHistory = (exp, res) => {
    // window.sessionStorage.setItem('exp', exp);
    // window.sessionStorage.setItem('mark', mark);
    // window.sessionStorage.setItem('res', res);
    window.sessionStorage.setItem('key', exp + res);
}

let finalResult = ch => {

    if (continueif) {
        if (checkflag) {
            continueif = checkflag = false;
        } else {
            former_type = 'special';
            if (ch.type == 'base' || ch.type == 'special' || ch.type == 'specialbase' || ch.value == 'equal') {
                init.push(content.show_curr);
                combin.push(content.show_curr);
                num_init = [];
            } else if (ch.type == 'number' && ch.value != 'equal') {
                continueif = checkflag = false;
                former_type = undefined;
            }
            console.log('ifffffffffffff');
        }

    }

    if (ch.type == 'number') {

        console.log('number-----------');
        if (num_init.length > 12) return '算不过来了＞︿＜';
        if (former_type == 'special') return '怕是需要一个运算符呀( ╯□╰ )';

        if (ch.value == 'dot') {
            if (num_init.indexOf('.') != -1) return '小数点是唯一的呦(/▽＼)';
            init.push(ch.value);
            num_init.push('.');
            former_type = ch.type;
        } else {
            init.push(ch.value);
            num_init.push(ch.value);
            former_type = ch.type;
        }

    } else if (ch.type == 'base') {

        console.log('base---------------')
        if (former_type == 'base' && ch.value != 'equal') {
            if (init.length > 1 && num_init[0] != '-') {
                init.pop();
                combin.pop();
                num_init = [];
            }
        }
        if (former_type == 'special') num_init = [];

        if (ch.value == 'equal') {

            if (isNaN(combin[combin.length - 1])) combin.push(combinNum(num_init));
            content.show_prev = combin.reduce((total, current) => total += (!isNaN(current) && current < 0) ? `(${current})` : current, '');
            let result = eval(content.show_prev);
            console.log(result + '+++++++++++');
            form.show_prev = combin.reduce((total, current) => total += (!isNaN(current) && current < 0) ? `(${formNum(current)})` : formNum(current), '') + '=';
            content.show_curr = result;
            form.show_curr = formNum(result);
            storageHistory(form.show_prev, form.show_curr);
            init = [0];
            combin = [];
            num_init = ['+', 0];
            former_type = undefined;
            continueif = true;
            return 'Success';

        } else {
            let op;
            switch (ch.value) { // "10"==='10'----true
                case 'mod':
                    op = '%';
                    break;
                case 'divide':
                    op = '/';
                    break;
                case 'times':
                    op = '*';
                    break;
                case 'sub':
                    op = '-';
                    break;
                case 'plus':
                    op = '+';
                    break;
                default:
                    break;
            }
            if (num_init[0] != undefined) combin.push(combinNum(num_init));
            init.push(ch.value);
            combin.push(op);
            num_init = ['+', 0];
            former_type = ch.type;
        }

    } else if (ch.type == 'clear') {

        console.log('clear------------');

        if (ch.value == 'bs') {              //退格,无法退操作符之后的

            if (former_type != 'special' && former_type != 'base' && num_init[2] != undefined) {
                init.pop();
                num_init.pop();
                former_type = num_init[2] == undefined ? (isNaN(combin[combin.length - 1]) ? 'base' : 'special') : 'number';
            }

        } else if (ch.value == 'c') {        //清除全部输入

            init = [0];
            combin = [];
            num_init = ['+', 0];
            former_type = undefined;

        } else if (ch.value == 'ce') {       //清除当前输入的数字和输入的special

            let i = init.length;
            if (num_init[2] == undefined) {
                if (!isNaN(combin[combin.length - 1])) {
                    combin.pop();
                    while (init[i - 1] != 'plus' || init[i - 1] != 'mod' || init[i - 1] != 'divide' || init[i - 1] != 'sub' || init[i - 1] != 'times') {
                        init.pop();
                        if (--i == 1) break;
                    }
                }
            } else {
                num_init.map(() => {
                    if (init[i--]) init.pop();
                });
                num_init = ['+', 0];
            }
            former_type = 'base';

        }
    } else if (ch.type == 'special') {

        console.log('special------------');
        let l = combin.length;

        if (ch.value == 'sqrt') {     //平方根

            if (num_init[0] == '-') return '这涉及到复数这个禁忌知识啦o((⊙﹏⊙))o.';
            // if (num_init[2] == undefined && !isNaN(combin[l - 1])) {
            if (former_type == 'special') {
                combin.splice(-1, 1, Math.sqrt(combin[l - 1]));
            } else {
                combin.push(Math.sqrt(combinNum(num_init)));
                num_init = ['+', 0];
            }

        } else if (ch.value == 'pow') {     //平方

            if (former_type == 'special') {
                combin.splice(-1, 1, combin[l - 1] ** 2);
            } else {
                combin.push(combinNum(num_init) ** 2);
                num_init = ['+', 0];
            }

        } else if (ch.value == 'reciprocal') {   //倒数

            if (former_type == 'special') {
                combin.splice(-1, 1, 1 / combin[l - 1]);
            } else {
                combin.push(1 / combinNum(num_init));
                num_init = ['+', 0];
            }

        }
        former_type = ch.type;

    } else if (ch.type == 'specialbase') {
        console.log('specialbase---------------');
        if (ch.value == 'inverse') {
            (num_init[3] == undefined && !isNaN(combin[combin.length - 1]))
                ? combin.splice(-1, 1, -combin[combin.length - 1])
                : num_init[0] == '+'
                    ? num_init.splice(0, 1, '-')
                    : num_init.splice(0, 1, '+');
        }
    }

    content.show_prev = combin.reduce((total, current) => total += (!isNaN(current) && current < 0) ? `(${current})` : current, '');
    content.show_curr = num_init[0] == undefined ? '0' : (
        (num_init[0] == '+' ? '' : '-')
        + dotNum(num_init.reduce((t, c, i) => {
            if (i > 1) t += c;
            else t = 0;
            return t;
        }, ''))
        // + (isNaN(num_init[num_init.length - 1]) ? '.' : '')
    );

    form.show_prev = combin.reduce((total, current) => total += (!isNaN(current) && current < 0) ? `(${formNum(current)})` : formNum(current), '');
    form.show_curr = formNum(content.show_curr);

    if (continueif) checkflag = true;

    // console.log(content);

    // console.log(init);
    // console.log(11111111111111111111);
    // console.log(combin);
    // console.log(222222222222222222222);
    // console.log(num_init);
    // console.log(3333333333333333333333);
}

export { finalResult, form };
