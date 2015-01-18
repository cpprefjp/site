#operator!=
```cpp
template <class Key, class Compare, class Allocator>
bool operator!=(const set<Key,Compare,Allocator>& x, const set<Key,Compare,Allocator>& y);
```

##概要
`x` と `y` が等しくないかどうかの判定を行う。


##パラメータ
- `x`, `y`<br/>
比較するコンテナ。


##戻り値
二つのコンテナが等しくない場合に `true`, そうでない場合に `false`。


##計算量
[`size()`](./size.md) に対して線形時間。


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  std::set<int> s1, s2;
  s1.insert(10);
  s1.insert(20);
  s1.insert(30);
  s2 = s1;

  std::cout << (s1 != s2) << std::endl;

  s2.insert(40);

  std::cout << (s1 != s2) << std::endl;

  return 0;
}
```

###出力
```
0
1
```


