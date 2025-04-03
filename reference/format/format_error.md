# format_error
* format[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  class format_error : public runtime_error;
}
```
* string[link /reference/string/basic_string.md]

## 概要
`<format>`の各機能の失敗を表す例外クラス。ユーザー定義フォーマッターもこの例外を投げることができる。

## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [(constructor)](format_error/op_constructor.md) | コンストラクタ | C++20 |
| [(destructor)](format_error/op_destructor.md) | デストラクタ | C++20 |
| [`operator=`](format_error/op_assign.md) | 代入演算子 | C++20 |
| [`what`](format_error/what.md) | エラー理由を取得する | C++20 |


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
