# construct_at
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
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
* addressof[link addressof.md]

以下と等価：

```cpp
return ::new (voidify(*location)) T(std::forward<Args>(args)...);
```
* std::forward[link /reference/utility/forward.md]


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  // 配置newでオブジェクトを構築
  char storage[4];
  int* n = std::construct_at(reinterpret_cast<int*>(storage));

  *n = 314;
  std::cout << *n << std::endl;

  // デストラクタを呼び出して破棄
  std::destroy_at(n);
}
```
* std::destroy_at[color ff0000]

### 出力
```
314
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 12.0
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 可変サイズをもつコンテナの`constexpr`化](/lang/cpp20/more_constexpr_containers.md)

## 参照
- [P0040R3 Extending memory management tools](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0040r3.html)
- [P0784R7 More `constexpr` containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
