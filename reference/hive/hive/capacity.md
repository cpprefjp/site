# capacity
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
size_type capacity() const noexcept; // (1) C++26
```

## 概要
要素ブロックを追加確保せずに保持できる要素数を取得する。


## 戻り値
要素ブロックの追加確保を必要とせずに`*this`が保持できる総要素数


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

  // 100要素分の領域を予約する
  h.reserve(100);

  // 予約した領域を確認する
  std::println("size = {}", h.size());
  std::println("capacity >= 100 : {}", h.capacity() >= 100);
}
```
* capacity()[color ff0000]
* h.reserve[link reserve.md]
* h.size()[link size.md]

### 出力
```
size = 0
capacity >= 100 : true
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive::reserve`](reserve.md)
- [`hive::shrink_to_fit`](shrink_to_fit.md)
- [`hive::trim_capacity`](trim_capacity.md)
- [`hive::size`](size.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
