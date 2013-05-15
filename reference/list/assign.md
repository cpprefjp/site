#assign
```cpp
template <class InputIterator>

void assign(InputIterator first, InputIterator last);

void assign(size_type n, const T& t);
void assign(initializer_list<T>);  // C++11
```

##概要
コンテナの再代入

- `template <class InputIterator>`<br/>`void assign(InputIterator first, InputIterator last);`<br/>範囲を代入。<br/>効果：<br/>`clear();`<br/>`insert(begin(), first, last);`
- `void assign(size_type n, const T& t);`<br/>`n` 個の値 `t` を代入。<br/>効果：<br/>`clear();`<br/>`insert(begin(), n, t);`
- `void assign(initializer_list<T> init);`<br/>初期化子リストを代入。<br/>効果：<br/>`clear();`<br/>`insert(begin(), init.begin(), init.end());`


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

###出力
```
ls1 : 1 2 3 
ls2 : 1 1 1 
ls3 : 1 2 3 
```

##参照


