#scientific
* ios[meta header]

```cpp
namespace std {
  ios_base& scientific(ios_base& str);
}
```

##概要
浮動小数点数を指数表記で出力することを指示するマニピュレータ。

##効果
`str.setf(ios_base::scientific, ios_base::floatfield)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
[`defaultfloat`](./defaultfloat.md)を参照。

##バージョン
###言語
- C++03

##参照
- [`defaultfloat`](./defaultfloat.md)
- [`fixed`](./fixed.md)
- [`hexfloat`](./hexfloat.md)
