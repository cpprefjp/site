#assign
```cpp
template <class InputIterator>

void assign(InputIterator first, InputIterator last);

void assign(size_type n, const T& t);
void assign(initializer_list<T>);  // C++11
```

##概要
<b>コンテナの再代入</b>

- <b>template <class InputIterator>void assign(InputIterator first, InputIterator last);</b><b>範囲を代入。効果：</b><b>clear();insert(begin(), first, last);</b>
- <b>void assign(size_type n, const T& t);n 個の値 t を代入。効果：clear();insert(begin(), n, t);</b>
- <b>void assign(initializer_list<T> init);初期化子リストを代入。効果：clear();insert(begin(), init.begin(), init.end());</b>


##戻り値

なし


##例

```cpp
#include <iostream>
#include <list>
#include <string>

template <class T>
void print(const std::string& name, const std::list<T>& ls)
{
  std::cout << name << " : ";
  for (const T& x : ls) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}

int main()
{
  // 範囲を代入
  {
    std::list<int>  ls  =  { 1, 2, 3 };
    std::list<int>  ls1;
    ls1.assign(ls.begin(), ls.end());

    print("ls1", ls1);
  }

  // n 個の指定された値で埋める
  {
    std::list<int>  ls2;
    ls2.assign(3, 1);

    print("ls2", ls2);
  }

  // 初期化子リストを代入
  {
    std::list<int>  ls3;
    ls3.assign({ 1, 2, 3 });

    print("ls3", ls3);
  }
}
```
* assign[color ff0000]
* assign[color ff0000]
* assign[color ff0000]

###出力

```cpp
ls1 : 1 2 3 
ls2 : 1 1 1 
ls3 : 1 2 3 
```

##参照


