# erase_if
* hive[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator, class Predicate>
  typename hive<T, Allocator>::size_type
    erase_if(hive<T, Allocator>& c, Predicate pred); // (1) C++26
}
```

## 概要
指定した条件に合致する要素とその分の領域を、コンテナから削除する。


## 効果
以下と等価である：

```cpp
auto original_size = c.size();
for (auto i = c.begin(); i != c.end(); ) {
  if (pred(*i)) {
    i = c.erase(i);
  } else {
    ++i;
  }
}
return original_size - c.size();
```
* c.size()[link size.md]
* c.begin()[link begin.md]
* c.end()[link end.md]
* c.erase[link erase.md]


## 戻り値
削除した要素数を返す。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h = {3, 1, 4, 5, 2};

  // コンテナhから、偶数をすべて削除する
  std::hive<int>::size_type n = std::erase_if(h, [](int x) { return x % 2 == 0; });

  std::println("erased = {}", n);
  for (int x : h) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* std::erase_if[color ff0000]

### 出力
```
erased = 2
3 1 5 
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
- [`std::erase`](erase_free.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
- [LWG Issue 4318. Have `hive::erase_if` reevaluate `end()` to avoid UB](https://cplusplus.github.io/LWG/issue4318)
    - C++26で、効果のループが`c.end()`をキャッシュせず毎回再評価するよう修正された。`c.erase()`が終端イテレータを無効化しうるため、キャッシュした終端との比較が未定義動作を引き起こす問題を防ぐもの
