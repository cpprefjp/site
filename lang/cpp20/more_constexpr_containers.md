# 可変サイズをもつコンテナの`constexpr`化
* cpp20[meta cpp]

## 概要

C++20より、定数式における動的メモリ確保と解放が許可される。それに伴い、`std::vector`と`std::string`の全メンバ関数が`constexpr`対応し、定数式で使用できるようになる。

```cpp
constexpr int test_vector() {
  std::vector<int> v = {5, 3, 2, 9, 1, 0, 4};
  v.push_back(11);

  int s{};
  for(auto n : v) {
    s += n;
  }

  return s;
}

constexpr bool check_cpp_file(const std::string& filename) {
  return filename.end_with(".cpp") || filename.end_with(".hpp");
}

static_assert(test_vector() == 35);         // OK
static_assert(check_cpp_file("main.cpp"));  // OK
```

## 仕様
(執筆中)

### `constexpr`デストラクタ

### `new/delete`式

### `std::allocator/std::allocator_traits`


## この機能が必要になった背景・経緯

`std::vector`をはじめとする可変サイズのコンテナは実行時に非常に有用であるため、同様に定数式においても有用である可能性があり、その必要性がC++コミュニティからも示されいていた（[C++Now 2017: Ben Deane & Jason Turner "constexpr ALL the things!"](https://youtu.be/HMB9oXFobJc)、[P0810R0 constexpr in Practice](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0810r0.pdf)など）。

また、静的リフレクション機能の導入にあたっては、コンパイル時に使用可能な可変サイズコンテナおよび可変サイズの文字列型が必要となっていた。例えば、ある型のテンプレート引数をクエリするコードは次のようなものになる

```cpp
// 型Tのテンプレート引数の情報を取り出す
std::vector<std::metainfo> args = std::meta::get_template_args(reflexpr(T));
```

※ これは最終的なリフレクション仕様とは異なる可能性がある

これらの流れを受けて、`std::vector`と`std::string`を定数式で使用可能とするために、その最大の障壁となっていたメモリの動的確保と解放周りの機能が定数式で使用可能となった。

## 検討されたほかの選択肢
(執筆中)

## 関連項目

- [`vector`](/reference/vector/vector.md)
- [`basic_string`](/reference/string/basic_string.md)

## 参照
- [P0784R2 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0784r2.html)
- [P0784R3 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0784r3.html)
- [P0784R4 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0784r4.html)
- [P0784R5 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r5.html)
- [P0784R6 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r6.html)
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)

