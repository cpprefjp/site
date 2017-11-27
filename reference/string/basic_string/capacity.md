# capacity
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
size_type capacity() const;          // C++03
size_type capacity() const noexcept; // C++11
```

## 概要
メモリを再確保せずに格納できる最大の要素数を取得する。


## 戻り値
メモリを再確保せずに格納できる最大の要素数


## 例外
投げない


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
