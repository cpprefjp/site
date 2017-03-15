# hex
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& hex(ios_base& str);
}
```

## 概要
整数を十六進法で出力することを指示するマニピュレータ。

## 効果
`str.setf(ios_base::hex, ios_base::basefield)`を実行する。

## 戻り値
実引数のstrオブジェクト。

## 例
[`dec`](dec.md)を参照。

## バージョン
### 言語
- C++03

## 参照
- [`oct`](oct.md)
- [`dec`](dec.md)
