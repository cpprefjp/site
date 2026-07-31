# swap (非メンバ関数)
* hive[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator>
  void swap(hive<T, Allocator>& x,
            hive<T, Allocator>& y) noexcept(noexcept(x.swap(y))); // (1) C++26
}
```

## 概要
2つの`hive`オブジェクトを入れ替える。


## 効果
`x.`[`swap`](swap.md)`(y)`と等価である。


## 戻り値
なし


## 例
```cpp example
#include <hive>
#include <print>

void print(const char* name, const std::hive<int>& h)
{
  std::print("{} : ", name);
  for (int x : h) {
    std::print("{} ", x);
  }
  std::println("");
}

int main()
{
  std::hive<int> h1 = {1, 2, 3};
  std::hive<int> h2 = {4, 5, 6};

  std::swap(h1, h2);

  print("h1", h1);
  print("h2", h2);
}
```
* std::swap[color ff0000]

### 出力
```
h1 : 4 5 6 
h2 : 1 2 3 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive::swap`](swap.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
