# operator-=
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
reverse_iterator& operator-=(difference_type n);
```

## 概要
イテレータ自身を`n`回逆に進める。

`reverse_iterator`は進める。


## 効果
`current += n`


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.begin());

  it -= 1; // イテレータを1回逆に進める

  std::cout << *it << std::endl;
}
```
* it -= 1;[color ff0000]

### 出力
```
1
```

## 参照


