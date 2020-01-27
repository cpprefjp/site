# format_to_n_result

* format[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Out>
  struct format_to_n_result {
    Out out;
    iter_difference_t<Out> size;
  };
}
```

## 概要
[`format_to_n`](format_to_n.md)の結果を表す構造体。

## メンバ変数

| 名前            | 説明                                         | 対応バージョン |
|-----------------|----------------------------------------------|----------------|
| out             | 出力後の出力イテレーター                     | C++20          |
| size            | 文�列表現全体を格納するのに必要だった文�数 | C++20          |

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

* [`format_to_n`](format_to_n.md)

## 参照

* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
