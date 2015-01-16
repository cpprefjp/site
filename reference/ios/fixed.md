#fixed
```cpp
namespace std {
  ios_base& fixed(ios_base& str);
}
```

##概要
浮動小数点数を小数点表記で出力することを指示するマニピュレータ。

##効果
`str.setf(ios_base::fixed, ios_base::floatfield)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
[`defaultfloat`](./defaultfloat.md)を参照。

##バージョン
###言語
- C++03

##参照
- [`defaultfloat`](./defaultfloat.md)
- [`scientific`](./scientific.md)
- [`hexfloat`](./hexfloat.md)
