# internal
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& internal(ios_base& str);
}
```

## 概要
出力時に両端揃えにすることを指示するマニピュレータ。
フィールド幅に揃えるための文�を�間部分に挿入するようになる。
`setw`と組み合わせることで効果がある。

具体的には、以下の部分が�間部分となる。挿入できる�間部分がない場合、std::leftと同じような出力になる。

- 符号付き整数の場合、符号と整数の間
- `std::showbase`によるプレフィックスと数値の間

## 効果
`str.setf(ios_base::internal, ios_base::adjustfield)`を実行する。

## 戻り値
実引数`str`オブジェクト。

## 例
[`left`](left.md)を参照。

## バージョン
### 言語
- C++03

## 参照
- [`left`](left.md)
- [`right`](right.md)
