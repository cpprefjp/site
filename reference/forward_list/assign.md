#assign (C++11)
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]

```cpp
template <class InputIterator>
void assign(InputIterator first, InputIterator last); // (1)

void assign(size_type n, const T& t);                 // (2)

void assign(initializer_list<T> init);                // (3)
```
* initializer_list[link /reference/initializer_list.md]

##概要

コンテナの再代入

- (1) : 範囲を代入。
- (2) : `n`個の値`t`を代入。
- (3) : 初期化子リストを代入。


##効果

- (1) :

```cpp
clear();
insert_after(before_begin(), first, last);
```
* clear[link ./clear.md]
* insert_after[link ./insert_after.md]
* before_begin[link ./before_begin.md]


- (2) :

```cpp
clear();
insert_after(before_begin(), n, t);
```
* clear[link ./clear.md]
* insert_after[link ./insert_after.md]
* before_begin[link ./before_begin.md]


- (3) : 以下と同等

```cpp
assign(init.begin(), init.end());
```
* begin[link /reference/initializer_list/begin.md]
* end[link /reference/initializer_list/end.md]


##戻り値
なし


##例
```cpp
#include <iostream>
#include <forward_list>
#include <string>

template <class T>
void print(const std::string& name, const std::forward_list<T>& ls)
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
    std::forward_list<int> ls = {1, 2, 3};
    std::forward_list<int> ls1;
    ls1.assign(ls.begin(), ls.end());

    print("ls1", ls1);
  }

  // n個の指定された値で埋める
  {
    std::forward_list<int> ls2;
    ls2.assign(3, 1);

    print("ls2", ls2);
  }

  // 初期化子リストを代入
  {
    std::forward_list<int> ls3;
    ls3.assign({1, 2, 3});

    print("ls3", ls3);
  }
}
```
* assign[color ff0000]
* iostream[link ../iostream.md]
* string[link ../string.md]
* forward_list[link ../forward_list.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]
* begin[link begin.md]
* end[link end.md]

###出力
```
ls1 : 1 2 3 
ls2 : 1 1 1 
ls3 : 1 2 3 
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (3)の経緯となる提案文書


