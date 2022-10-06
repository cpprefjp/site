# capacity
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type capacity() const;                    // (1) C++03
size_type capacity() const noexcept;           // (1) C++11
constexpr size_type capacity() const noexcept; // (1) C++20
```

## 概要
メモリを再確保せずに格納できる最大の要素数を取得する。


## 戻り値
メモリを再確保せずに格納できる最大の要素数


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s;
  s.reserve(3);

  // 確保したサイズを確認
  std::size_t cap = s.capacity();
  std::cout << cap << std::endl;
}
```
* capacity()[color ff0000]
* reserve[link reserve.md]

### 出力例
```
3
```

## 参照
- [LWG Issue 3004. §[string.capacity] and §[vector.capacity] should specify time complexity for `capacity()`](https://wg21.cmeerw.net/lwg/issue3004)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
