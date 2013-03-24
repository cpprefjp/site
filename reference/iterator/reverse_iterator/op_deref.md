#operator*
```cpp
reference operator*() const;
```

##概要

<b>イテレータを間接参照する。</b>


##要件



##効果

`deref_tmp = current;``--deref_tmp;``return *deref_tmp;`
※`deref_tmp`は、ぶら下がり参照を避けるために関数内のローカル変数ではなく、メンバ変数として保持される。

##例

```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.end());

  int& result = *it;

  std::cout << result << std::endl;
}
```
* *it[color ff0000]

###出力

```cpp
3
```

##参照


