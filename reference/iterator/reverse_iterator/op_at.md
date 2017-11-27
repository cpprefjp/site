# operator[]
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
unspecified operator[](difference_type n) const;
```
* unspecified[italic]

## 概要
任意の位置にランダムアクセスする。


## 戻り値
`current[-n-1]`

## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.end());

  int& result = it[1]; // 1番目の要素にランダムアクセス

  std::cout << result << std::endl;
}
```
* it[1][color ff0000]

### 出力
```
2
```

## 参照


