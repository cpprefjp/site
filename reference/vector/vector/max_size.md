# max_size
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
size_type max_size() const;                    // (1) C++03
size_type max_size() const noexcept;           // (1) C++11
constexpr size_type max_size() const noexcept; // (1) C++20
```

## 概要
コンテナに格納可能な最大数を取得する。


## 戻り値
コンテナに格納可能な最大数


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v;
  std::size_t s = v.max_size();

  std::cout << s << std::endl;
}
```
* max_size()[color ff0000]

### 出力例
```
4611686018427387903
```


## 参照
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
