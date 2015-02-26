#oct
* ios[meta header]

```cpp
namespace std {
  ios_base& oct(ios_base& str);
}
```

##概要
整数を八進法で出力することを指示するマニピュレータ。

##効果
`str.setf(ios_base::oct, ios_base::basefield)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
[`dec`](./dec.md)を参照。

##バージョン
###言語
- C++03

##参照
- [`dec`](./dec.md)
- [`hex`](./hex.md)
