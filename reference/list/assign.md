#assign
* list[meta header]
* std[meta namespace]

```cpp
template <class InputIterator>
void assign(InputIterator first, InputIterator last); // (1)

void assign(size_type n, const T& t);  // (2)
void assign(initializer_list<T> init); // (3) C++11
```
* initializer_list[link /reference/initializer_list.md]

##概要
コンテナの再代入

- (1) : 範囲を代入。
- (2) : `n` 個の値 `t` を代入。
- (3) : 初期化子リストを代入。


##効果
- (1) :

```cpp
clear();
insert(begin(), first, last);
```
* clear[link ./clear.md]
* insert[link ./insert.md]
* begin[link ./begin.md]


- (2) :

```cpp
clear();
insert(begin(), n, t);
```
* clear[link ./clear.md]
* insert[link ./insert.md]
* begin[link ./begin.md]


- (3) :

```cpp
clear();
insert(begin(), init.begin(), init.end());
```
* clear[link ./clear.md]
* insert[link ./insert.md]
* begin[link ./begin.md]
* init.begin[link /reference/initializer_list/begin.md]
* init.end[link /reference/initializer_list/end.md]


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


