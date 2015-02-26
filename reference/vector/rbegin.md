#rbegin
* vector[meta header]

```cpp
reverse_iterator rbegin() noexcept;
const_reverse_iterator rbegin() const noexcept;
```

##概要
末尾要素を指す逆イテレータを取得する。


##戻り値
非`const`な文脈では`reverse_iterator`型で末尾要素への逆イテレータを返し、

`const`な文脈では`const_reverse_iterator`型で末尾要素への逆イテレータを返す。


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3};
  const std::vector<int>& cv = v;

  decltype(v)::reverse_iterator i = v.rbegin();
  decltype(v)::const_reverse_iterator ci = cv.rbegin();

  std::cout << *i << std::endl;
  std::cout << *ci << std::endl;
}
```
* rbegin[color ff0000]

###出力
```
3
3
```

##参照


