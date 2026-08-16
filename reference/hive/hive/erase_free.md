# erase (非メンバ関数)
* hive[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator, class U = T>
  typename hive<T, Allocator>::size_type
    erase(hive<T, Allocator>& c, const U& value); // (1) C++26
}
```

## 概要
指定した値をもつ要素とその分の領域を、コンテナから削除する。


## 効果
以下と等価である：

```cpp
return erase_if(c, [&](const auto& elem) -> bool { return elem == value; });
```
* erase_if[link erase_if_free.md]


## 戻り値
削除した要素数を返す。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h = {3, 1, 4, 1, 5};

  // コンテナhから、値1をもつ要素をすべて削除する
  std::hive<int>::size_type n = std::erase(h, 1);

  std::println("erased = {}", n);
  for (int x : h) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* std::erase[color ff0000]

### 出力
```
erased = 2
3 4 5 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive::erase`](erase.md)
- [`std::erase_if`](erase_if_free.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
- [LWG Issue 4233. The helper lambda of `std::erase` for `hive` should specify return type as `bool`](https://cplusplus.github.io/LWG/issue4233)
    - C++26で、テンプレートパラメータ`U`にデフォルト引数`= T`が追加され、効果のラムダに戻り値型`-> bool`が明示された
