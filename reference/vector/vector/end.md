# end
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
iterator end();                      // (1) C++03
iterator end() noexcept;             // (1) C++11

const_iterator end() const;          // (2) C++03
const_iterator end() const noexcept; // (2) C++11
```

## 概要
末尾の次を指すイテレータを取得する。


## 戻り値
非`const`な文脈では`iterator`型で最後尾要素の次を指すイテレータを返し、

`const`な文脈では`const_iterator`型で 最後尾要素の次を指すイテレータを返す。


## 例外
投げない


## 計算量
定数時間


## 備考
- この関数によって返されるイテレータは、`*this`が保持するいずれの要素も参照しない。その指す先は、不�な範囲となるだろう


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3};
  const std::vector<int>& cv = v;

  decltype(v)::iterator i = v.begin();
  decltype(v)::iterator last = v.end();

  decltype(v)::const_iterator ci = cv.begin();
  decltype(v)::const_iterator clast = cv.end();

  for (; i != last; ++i) {
    std::cout << *i << std::endl;
  }

  for (; ci != clast; ++ci) {
    std::cout << *ci << std::endl;
  }
}
```
* end()[color ff0000]
* begin()[link begin.md]

### 出力
```
1
2
3
1
2
3
```


