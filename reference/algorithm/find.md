#find
```cpp
namespace std {  template<class InputIterator, class T>
  InputIterator find(InputIterator first, InputIterator last, const T& value);}
```

###戻り値

[first,last) 内のイテレータ i について、*i == value であるような最初のイテレータを返す。そのようなイテレータが見つからなかった場合は last を返す。

###計算量

最大で last - first 回比較を行う

###実装例

<pre>```cpp
template<class InputIterator, class T>
InputIterator find(InputIterator first, InputIterator last, const T& value) {
  for ( ; first != last; ++first)
    if (*first == value) return first;
  return last;
}
</pre>
```

###使用例

<pre>```cpp
#include <algorithm>
#include <iostream>
#include <vector>
 
int main() {
  std::vector<int> v = { 3, 1, 4 };
  auto result = std::find(v.begin(), v.end(), 1);
  if (result == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result << std::endl;
  }
}
</pre>
```
* find[color ff0000]

###出力

<pre>```cpp
found: 1
</pre>
```
