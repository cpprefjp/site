# rend
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
reverse_iterator rend();                      // (1) C++03
reverse_iterator rend() noexcept;             // (1) C++11

const_reverse_iterator rend() const;          // (2) C++03
const_reverse_iterator rend() const noexcept; // (2) C++11
```

## 概要
先�要素の前を指す逆イテレータを取得する。


## 戻り値
非`const`な文脈では`reverse_iterator`型で先�要素の前を指す逆イテレータを返し、

`const`な文脈では`const_reverse_iterator`型で 先�要素の前を指す逆イテレータを返す。


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
  std::vector<int> v = {1, 2, 3};
  const std::vector<int>& cv = v;

  decltype(v)::reverse_iterator i = v.rbegin();
  decltype(v)::reverse_iterator last = v.rend();

  decltype(v)::const_reverse_iterator ci = cv.rbegin();
  decltype(v)::const_reverse_iterator clast = cv.rend();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* rend()[color ff0000]
* rbegin()[link rbegin.md]

### 出力
```
3
2
1
3
2
1
```

