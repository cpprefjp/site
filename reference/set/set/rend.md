#rend, crend
```cpp
reverse_iterator rend() noexcept;
const_reverse_iterator rend() const noexcept;

// since C++11
const_reverse_iterator crend() const noexcept;
```


##概要
`set` コンテナの先頭要素の前（これは反転シーケンスの末尾にあたる）を指す逆イテレータを返す。 
`rend()` は [`begin()`](./begin.md) と同じ要素を指すわけではなく、その前の要素を指すことに注意。


##戻り値
反転シーケンスの終端を指す逆イテレータ。 
`reverse_iterator` と `const_reverse_iterator` はメンバ型である。`set` クラステンプレートにおいて、これらは逆双方向イテレータであり、それぞれ `reverse_iterator<iterator>`, `reverse_iterator<const_iterator>` と定義される。


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

  std::set<int>::reverse_iterator i = c.rbegin();
  while (i != c.rend())
    std::cout << *i++ << " ";
  std::cout << std::endl;
}
```
* iostream[link ../../iostream.md]
* set[link ../../set.md]
* insert[link insert.md]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]
* rbegin[link rbegin.md]
* rend[color ff0000]

###出力
```
9 5 4 2 1 0 
```

##参照

| 名前                             | 説明                         |
|----------------------------------|------------------------------|
| [`rbegin, crbegin`](./rbegin.md) | 末尾を指す逆イテレータを返す |
| [`begin, cbegin`](./begin.md)    | 先頭を指すイテレータを返す   |
| [`end, cend`](./end.md)          | 末尾を指すイテレータを返す   |
