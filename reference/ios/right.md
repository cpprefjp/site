#right
* ios[meta header]

```cpp
namespace std {
  ios_base& right(ios_base& str);
}
```

##概要
出力時に右揃えにすることを指示するマニピュレータ。
フィールド幅に揃えるための文字を左側に挿入するようになる。
`setw`と組み合わせることで効果がある。

##効果
`str.setf(ios_base::right, ios_base::adjustfield)`を実行する。

##戻り値
実引数のstrオブジェクト。

##例
[`left`](./left.md)を参照。

##バージョン
###言語
- C++03

##参照
- [`internal`](./internal.md)
- [`left`](./left.md)
