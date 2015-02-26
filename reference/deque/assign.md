#assign
* deque[meta header]

```cpp
template <class InputIterator>
void assign(InputIterator first, InputIterator last);

void assign(size_type n, const T& t);

// C++11から
void assign(initializer_list<T> init);
```
* initializer_list[link /reference/initializer_list.md]

##概要
コンテナに値を代入する。

- `template <class InputIterator>`<br/>`void assign(InputIterator first, InputIterator last);`<br/>`*this`の全ての要素を解放し、`[first, last)`の範囲の要素のコピーを`*this`にコピーする。
- `void assign(size_type n, const T& t);`<br/>`*this`の全ての要素が解放され、`t`オブジェクトの`n`個のコピーから`*this`を再構築する。
- `void assign(`[`initializer_list`](/reference/initializer_list.md)`<T> init);`<br/>`*this`の全ての要素を解放し、`x`の全ての要素を`*this`にコピーする。


##例
```cpp
#include <iostream>
#include <deque>

template <class T>
void print(const char* name, const std::deque<T>& c)
{
  std::cout << name << " : {";
  for (const T& x : c) {
    std::cout << x << " ";
  }
  std::cout << "}" << std::endl;
}

int main ()
{
  std::deque<int> c = {1, 2, 3};

  // 範囲の代入
  std::deque<int> c1;
  c1.assign(c.begin(), c.end());

  // 値1を持つオブジェクト3個から再構築
  std::deque<int> c2;
  c2.assign(3, 1);

  // 初期化子リストの代入
  std::deque<int> c3;
  c3.assign({1, 2, 3});

  print("c1", c1);
  print("c2", c2);
  print("c3", c3);
}
```
* assign[color ff0000]

###出力
```
c1 : {1 2 3 }
c2 : {1 1 1 }
c3 : {1 2 3 }
```

##参照


