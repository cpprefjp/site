#end, cend
```cpp
iterator end() noexcept;
const_iterator end() const noexcept;

// since C++11
const_iterator cend() const noexcept;
```

##概要
`set` コンテナの最後の要素の次を参照するイテレータを返す。


##戻り値
コンテナの最後の要素の次を参照するイテレータ。 
`iterator` と `const_iterator` はいずれもメンバ型である。`set` クラステンプレートにおいて、これらは双方向イテレータである。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <set>

int main()
{
  std::set<int> c;
  c.insert(5);
  c.insert(2);
  c.insert(4);
  c.insert(1);
  c.insert(0);
  c.insert(0);
  c.insert(9);

  std::set<int>::iterator i = c.begin();
  while (i != c.end())
    std::cout << *i++ << " ";
  std::cout << std::endl;
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* insert[link insert.md]
* begin[link begin.md]
* end[color ff0000]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]

###出力
```
0 1 2 4 5 9 
```

##参照

| 名前                             | 説明                             |
|----------------------------------|----------------------------------|
| [`begin, cbegin`](./begin.md)    | 先頭を指すイテレータを取得する   |
| [`rbegin, crbegin`](./rbegin.md) | 末尾を指す逆イテレータを取得する |
| [`rend, crend`](./rend.md)       | 先頭を指す逆イテレータを取得する |
