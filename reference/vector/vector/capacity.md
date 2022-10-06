# capacity
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
size_type capacity() const;                    // (1) C++03
size_type capacity() const noexcept;           // (1) C++11
constexpr size_type capacity() const noexcept; // (1) C++20
```

## 概要
メモリを再確保せずに格納できる最大の要素数を取得する


## 戻り値
メモリの再確保をすることなく保持することができる最大の要素数


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  // 確保した領域を確認
  {
    std::vector<int> v;
    v.reserve(3);

    std::size_t cap = v.capacity();
    std::cout << cap << std::endl;
  }

  // 要素を削除しただけでは領域は解放されない
  {
    std::vector<int> v = {3, 1, 4};
    v.erase(v.begin());

    std::size_t cap = v.capacity();
    std::cout << cap << std::endl;
  }
}
```
* capacity()[color ff0000]
* v.reserve[link reserve.md]
* v.erase[link erase.md]

### 出力例
```
3
3
```


## 参照
- [LWG Issue 3004. §[string.capacity] and §[vector.capacity] should specify time complexity for `capacity()`](https://wg21.cmeerw.net/lwg/issue3004)
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
