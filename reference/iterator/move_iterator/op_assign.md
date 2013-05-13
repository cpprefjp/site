#代入演算子
```cpp
template <class U> move_iterator& operator=(const move_iterator<U>& u);
move_iterator& operator=(const move_iterator&) = default;
move_iterator& operator=(move_iterator&&) = default;
```

##概要
- `move_iterator& operator=(const move_iterator<U>& u)`<br/>`u.base()`をメンバ変数に保持する。<br/>要件： `U`が`Iterator`に変換可能であること


##例
```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  std::move_iterator<decltype(v)::iterator> it1(v.begin());

  std::move_iterator<decltype(v)::const_iterator> it2;
  it2 = it1;

  std::cout << **it2.base() << std::endl;
}
```

###出力
```
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0


##参照


