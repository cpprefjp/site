# construct_at
* memory[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <class T, class... Args>
  constexpr T* construct_at(T* location, Args&&... args); // (1) C++20
}
```

## 概要
コンストラクタを呼び出す。

`location`の位置に配置newで型`T`のコンストラクタを呼び出す。


## テンプレートパラメータ制約
- 式`::new (declval<void*>()) T(declval<Args>()...)`が評価されないオペランドとして扱われる場合に、適格であること


## 効果
以下の関数があるとして、

```cpp
template<class T>
constexpr void* voidify(T& ptr) noexcept {
  return const_cast<void*>(static_cast<const volatile void*>(addressof(ptr)));
}
```

以下と等価：

```cpp
auto ptr = ::new (voidify(*location)) T(std::forward<Args>(args)...);
if constexpr (is_array_v<T>)
  return launder(location);
else
  return ptr;
```
* is_array_v[link /reference/type_traits/is_array.md]
* launder[link /reference/new/launder.md]


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  // 配置newでオブジェクトを構築
  char storage[4];
  int* n = std::ranges::construct_at(reinterpret_cast<int*>(storage));

  *n = 314;
  std::cout << *n << std::endl;

  // デストラクタを呼び出して破棄
  std::ranges::destroy_at(n);
}
```
* std::ranges::construct_at[color ff0000]
* std::ranges::destroy_at[link ranges_destroy_at.md]

### 出力
```
314
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 関連項目
- [`construct_at`](construct_at.md)

## 参照
- [P0896R4 The One Ranges Proposal](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [LWG Issue 3436. `std::construct_at` should support arrays](https://wg21.cmeerw.net/lwg/issue3436)
