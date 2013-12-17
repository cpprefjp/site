#operator--
```cpp
reverse_iterator& operator--();
reverse_iterator operator--(int);
```

##概要
イテレータをデクリメントする。

`reverse_iterator`は元となるイテレータを進める。


##効果
- 前置デクリメント `operator--()`：

```cpp
++current;
return *this;
```

- 後置デクリメント `operator--(int)`：

```cpp
reverse_iterator tmp = *this;
++current;
return tmp;
```


##例
```cpp
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.begin());

  --it;

  std::cout << *it << std::endl;
}
```
* --it[color ff0000]

###出力
```
1
```

##参照


