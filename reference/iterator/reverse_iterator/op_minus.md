#operator- (非メンバ関数)
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template<class Iterator1, class Iterator2> 
  typename reverse_iterator<Iterator>::difference_type 
  operator-(const reverse_iterator<Iterator1>& x, 
            const reverse_iterator<Iterator2>& y);     // C++03まで

  template <class Iterator1, class Iterator2>
  auto operator-(const reverse_iterator<Iterator1>& x,
                 const reverse_iterator<Iterator2>& y)
    -> decltype(y.current - x.current);                // C++11から
}
```

##概要
2つの`reverse_iterator`の差を求める


##戻り値
`y.current - x.current`


##例
```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end());
  std::reverse_iterator<decltype(v)::iterator> it2(v.begin());

  std::ptrdiff_t result = it2 - it1;
  std::cout << result << std::endl;
}
```
* it2 - it1[color ff0000]

###出力
```
3
```

##参照
- [LWG Issue 685. `reverse_iterator`/`move_iterator` difference has invalid signatures](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#685)


