#operator->
```cpp
pointer operator->() const;
```

##概要

<b>イテレータを通してオブジェクトにアクセスする</b>



##戻り値

`&(operator*())`

##例

```cpp
#include <iostream>
#include <vector>
#include <iterator>

class value {
  int x;

public:
  value(int x = 0) : x(x) {}
  int get() const { return x; }
};

int main()
{
  std::vector<value> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.end());

  int result = it->get();

  std::cout << result << std::endl;
}
```
* it->[color ff0000]

###出力

```cpp
3
```

##参照


