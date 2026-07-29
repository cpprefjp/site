# max_size
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
size_type max_size() const noexcept; // (1) C++26
```

## 概要
コンテナに格納可能な最大の要素数を取得する。


## 戻り値
コンテナに格納可能な最大の要素数


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h;

  std::println("{}", h.max_size());
}
```
* max_size()[color ff0000]

### 出力例
```
768614336404564650
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive::size`](size.md)
- [`hive::capacity`](capacity.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
