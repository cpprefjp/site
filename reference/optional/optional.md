# optional
* optional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  class optional;
}
```

## 概要


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](optional/op_constructor.md) | コンストラクタ | C++17 |
| [`(destructor)`](optional/op_destructor.md)   | デストラクタ | C++17 |


### 代入

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator=`](optional/op_assign.md) | 代入演算子 | C++17 |
| [`emplace`](optional/emplace.md)     | 要素型のコンストラクタ引数から直接構築する | C++17 |
| [`swap`](optional/swap.md)           | 他の`optional`オブジェクトとデータを入れ替える | C++17 |
| [`reset`](optional/reset.md)         | 有効値を保持していない状態にする | C++17 |


### 値の観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator*`](optional/op_deref.md)    | 間接参照 | C++17 |
| [`operator->`](optional/op_arrow.md)   | メンバアクセス | C++17 |
| [`operator bool`](optional/op_bool.md) | 有効な値を保持しているかを判定する | C++17 |
| [`has_value`](optional/has_value.md)   | 有効な値を保持しているかを判定する | C++17 |
| [`value`](optional/value.md)           | 有効値を取得する | C++17 |
| [`value_or`](optional/value_or.md)     | 有効値もしくは指定された無効値を取得する | C++17 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `value_type` | 要素型`T` | C++17 |


## 非メンバ関数
### ヘルパ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`make_optional`](make_optional.md) | 有効な値を保持する`optional`オブジェクトを構築する | C++17 |


### 値の入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](optional/swap_free.md) | 2つの`optional`オブジェクトを入れ替える | C++17 |


### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](optional/op_equal.md)     | 等値比較 | C++17 |
| [`operator!=`](optional/op_not_equal.md) | 非等値比較 | C++17 |
| `operator<`  | 左辺が右辺より小さいかを判定する | C++17 |
| `operator<=` | 左辺が右辺以下かを判定する | C++17 |
| `operator>`  | 左辺が右辺より大きいかを判定する | C++17 |
| `operator>=` | 左辺が右辺以上かを判定する | C++17 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](optional/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------------|-------|
| `template <class T> struct hash;`              | `hash`クラスの先行宣言                 | C++17 |
| `template <class T> struct hash<optional<T>>;` | `hash`クラスの`optional`に対する特殊化 | C++17 |


## 例
```cpp
```

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N1878 A proposal to add an utility class to represent optional objects (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1878.htm)
- [N3406 A proposal to add a utility class to represent optional objects (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3406.html)
- [N3527 A proposal to add a utility class to represent optional objects (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3527.html)
- [N3672 A proposal to add a utility class to represent optional objects (Revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3672.html)
- [N3793 A proposal to add a utility class to represent optional objects (Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3793.html)
- [N3966 Fixes for optional objects](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3966.html)
- [N3982 Rvalue reference overloads for optional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3982.html)
- [N4480 Programming Languages — C++ Extensions for Library Fundamentals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4480.html)
- [P0220R0 Adopt Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r0.html)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0032R0 Homogeneous interface for `variant`, `any` and `optional`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r0.pdf)
- [P0032R1 Homogeneous interface for `variant`, `any` and `optional` (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r1.pdf)
- [P0032R2 Homogeneous interface for `variant`, `any` and `optional` (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r2.pdf)
- [P0032R3 Homogeneous interface for `variant`, `any` and `optional` (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r3.pdf)
- [P0307R0 Making Optional Greater Equal Again](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0307r0.pdf)
- [P0307R2 Making Optional Greater Equal Again](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0307r2.pdf)
- [P0504R0 Revisiting in-place tag types for `any`/`optional`/`variant`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0504r0.html)
