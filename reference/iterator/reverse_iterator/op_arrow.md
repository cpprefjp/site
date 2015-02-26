#operator->
* iterator[meta header]
* std[meta namespace]

```cpp
pointer operator->() const;
```

##概要
イテレータを通してオブジェクトにアクセスする


##戻り値
- C++03 : `&(operator*())`
- C++14 : [`addressof`](/reference/memory/addressof.md)`(operator*())`

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
```
3
```

##参照
- [LWG Issue 2188. Reverse iterator does not fully support targets that overload `operator&`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2188)

