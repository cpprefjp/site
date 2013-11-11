#insert
```cpp
// C++03
iterator insert(iterator position, const T& x);
void insert(iterator position, size_type n, const T& x);
template <class InputIterator>
void insert(iterator position, InputIterator first,
            InputIterator last);

// C++11
iterator insert(const_iterator position, const T& x);
iterator insert(const_iterator position, T&& x);
iterator insert(const_iterator position, size_type n, const T& x);
template <class InputIterator>
iterator insert(const_iterator position, InputIterator first,
                InputIterator last);
iterator insert(const_iterator position, initializer_list<T> il);
```

##概要
任意の位置に新たな要素を挿入する。  
この関数は、指定されたイテレータが指す要素の前に、新たな要素を挿入する。  

- `iterator insert(const_iterator position, const T& x);`
- `iterator insert(const_iterator position, T&& x);`

新たな要素をひとつ挿入する  


- `iterator insert(const_iterator position, size_type n, const T& x);`

新たな要素`x`のコピーを`n`個挿入する  


- `iterator insert(const_iterator position, InputIterator first, InputIterator last);`

`[first, last)`の範囲の要素を挿入する  


- `iterator insert(const_iterator position, `[`initializer_list`](/reference/initializer_list.md)`<T> il);`

`initializer_list`の全て要素を挿入する  


##要件
第1パラメータ`position`が、`[`[`begin()`](./begin.md)`, `[`end()`](./end.md)`]`の範囲の間接参照可能なイテレータであること。


##戻り値
挿入された要素を指すイテレータ


##計算量
単一要素の追加の場合は定数時間。  
複数要素を追加する場合は、追加する要素数に比例して定数時間。


##例
```cpp
#include <iostream>
#include <list>
#include <string>
#include <iterator>
#include <vector>

template <class T>
void print(const std::string& name, const std::list<T>& ls)
{
  std::cout << name << " : ";
  for (const T& x : ls) {
    std::cout << x << ' ';
  };
  std::cout << std::endl;
}

int main()
{
  // ひとつの要素を挿入する
  {
    std::list<int> ls = {1, 2, 4};

    // 先頭に0を挿入
    ls.insert(ls.begin(), 0);

    // 4の前に3を挿入
    decltype(ls)::iterator it = std::next(ls.begin(), 3);
    ls.insert(it, 3);

    print("insert one element", ls);
  }
  // n個の要素を挿入する
  {
    std::list<int> ls = {1, 2, 5};

    // 5の前に3を2個挿入する
    ls.insert(std::next(ls.begin(), 2), 2, 3);

    print("insert n elements", ls);
  }
  // 指定範囲の要素を挿入する
  {
    std::list<int> ls = {1, 2, 6};

    // vの全ての要素をlsに挿入する
    const std::vector<int> v = {3, 4, 5};
    ls.insert(std::next(ls.begin(), 2), v.begin(), v.end());

    print("insert range", ls);
  }
  // 初期化子リストで要素を挿入する
  {
    std::list<int> ls = {1, 2, 6};

    ls.insert(std::next(ls.begin(), 2), {3, 4, 5});

    print("insert initializer_list", ls);
  }
}
```
* insert[color ff0000]

###出力
```
insert one element : 0 1 2 3 4 
insert n elements : 1 2 3 3 5 
insert range : 1 2 3 4 5 6 
insert initializer_list : 1 2 3 4 5 6 
```


