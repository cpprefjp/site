# single_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<copy_constructible T>
    requires is_object_v<T>
  class single_view : public view_interface<single_view<T>> { …… }; // (1) C++20

  template<move_constructible T>
    requires is_object_v<T>
  class single_view : public view_interface<single_view<T>> { …… }; // (1) C++23

  namespace views {
    inline constexpr /*unspecified*/ single = /*unspecified*/; // (2)
  }
}
```

## 概要
- (1): 値を要素1つのRangeに見せる[`view`](view.md)
- (2): `single_view`を生成するカスタマイゼーションポイントオブジェクト

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | ○    | ○     | ○    | ○      | ○            | ○            | ○         | ○     | ○       | ○   |

## 効果
- 式`views::single(E)`の効果は`single_view<decay_t<decltype((E))>>(E)`と等しい。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](single_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`begin`](single_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](single_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |
| [`data`](single_view/data.md.nolink)                     | 配列の先頭へのポインタを取得する | C++20          |

## 静的メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`size`](single_view/size.md.nolink)                     | 要素数を取得する                 | C++20          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|------------------------------ ----|----------------|
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++20          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](single_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;

  for(int n : views::single(1)) {
    cout << n;
  }
}
```
* views::single[color ff0000]

### 出力
```
1
```

## 実装例
```cpp
namespace std::ranges {
  template<copy_constructible T>
    requires is_object_v<T>
  class single_view : public view_interface<single_view<T>> {
  private:
    copyable-box<T> value_;

  public:
    single_view() requires default_initializable<T> = default;
    constexpr explicit single_view(const T& t): value_(t) {
    }
    constexpr explicit single_view(T&& t): value_(t) {
    }
    template<class... Args>
      requires constructible_from<T, Args...>
    constexpr explicit single_view(in_place_t, Args&&... args): value_{in_place, forward<Args>(args)...} {
    }

    constexpr T* begin() noexcept {
      return data();
    }
    constexpr const T* begin() const noexcept {
      return data();
    }
    constexpr T* end() noexcept {
      return data() + 1;
    }
    constexpr const T* end() const noexcept {
      return data() + 1;
    }
    static constexpr size_t size() noexcept {
      return 1;
    }
    constexpr T* data() noexcept {
      return value_.operator->();
    }
    constexpr const T* data() const noexcept {
      return value_.operator->();
    }
  };

  template<class T>
    single_view(T) -> single_view<T>;
}
```
* copy_constructible[link /reference/concepts/copy_constructible.md]
* default_initializable[link /reference/concepts/default_initializable.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* is_object_v[link /reference/type_traits/is_object.md]
* view_interface[link view_interface.md]
* copyable-box[link copyable_box.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2367R0 Remove misuses of list-initialization from Clause 24](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2367r0.html) (本提案文書はC++20に遡って適用されている)
