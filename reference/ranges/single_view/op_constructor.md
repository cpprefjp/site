# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* single_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
single_view()
  requires default_initializable<T> = default; // (1) C++20

constexpr explicit single_view(const T& t)
  requires copy_constructible<T>;              // (2) C++20

constexpr explicit single_view(T&& t);         // (3) C++20

template <class... Args>
  requires constructible_from<T, Args...>
constexpr explicit single_view(in_place_t, Args&&... args); // (4) C++20
```

## 概要
[`single_view`](../single_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : `t`をコピーして、`*this`に保持する
- (3) : `t`をムーブして、`*this`に保持する
- (4) : 型`T`のコンストラクタ引数`args...`を転送して`T`型オブジェクトを内部で構築し、`*this`に保持する


## テンプレートパラメータ制約
- (1) : 型`T`がデフォルト構築可能であること
- (2) : 型`T`がコピー構築可能であること
- (4) : 型`T`が`Args...`で構築可能であること


## 効果

- (2) : `value_`を`t`で初期化する
- (3) : `value_`を[`std::move`](/reference/utility/move.md)`(t)`で初期化する
- (4) : `value_{`[`in_place`](/reference/utility/in_place_t.md)`,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...}`で初期化する


## 例
```cpp example
#include <iostream>
#include <ranges>
#include <string>

int main() {
  // (2) コピー構築
  {
    std::string s1 = "hello";
    for (const std::string& x : std::views::single(s1)) {
      std::cout << x << std::endl;
    }
  }

  // (3) ムーブ構築
  {
    std::string s1 = "hello";
    for (const std::string& x : std::views::single(std::move(s1))) {
      std::cout << x << std::endl;
    }
  }

  // (4) コンストラクタ引数から構築
  {
    for (const std::string& x : std::ranges::single_view<std::string>(std::in_place, 3, 'a')) {
      std::cout << x << std::endl;
    }
  }
}

```
* std::ranges::single_view[color ff0000]
* std::views::single[color ff0000]

### 出力
```
hello
hello
aaa
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
