# data_member_spec
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info data_member_spec(info type, data_member_options options);
}
```
* info[link info.md]
* data_member_options[link data_member_options.md]

## 概要
データメンバの仕様を作成する。[`define_aggregate()`](define_aggregate.md)で使用するデータメンバの仕様を表すリフレクションを返す。


## 戻り値
指定された型`type`とオプション`options`に基づくデータメンバの仕様を表すリフレクションを返す。


## 例外
以下のいずれかの場合、[`std::meta::exception`](exception.md)例外を送出する：

- `type`がオブジェクト型または参照型を表さない場合
- `options.name`に値があり、有効な識別子でない場合
- `options.name`に値がなく、`options.bit_width`にも値がない場合


## 例
```cpp example
#include <meta>

struct S;

consteval {
  std::meta::define_aggregate(^^S, {
    std::meta::data_member_spec(^^int, {.name = "x"}),
    std::meta::data_member_spec(^^double, {.name = "y"})
  });
}

int main() {
  S s{1, 2.0};
  static_assert(std::meta::is_data_member_spec(
    std::meta::data_member_spec(^^int, {.name = "z"})));
}
```

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`data_member_options`](data_member_options.md)
- [`define_aggregate`](define_aggregate.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
