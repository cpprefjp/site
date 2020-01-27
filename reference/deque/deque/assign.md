# assign
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
template <class InputIterator>
void assign(InputIterator first, InputIterator last); // (1)

void assign(size_type n, const T& t);                 // (2)

void assign(initializer_list<T> init);                // (3) C++11
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
コンテナに値を代入する。


## 効果
- (1) : `*this`の全ての要素を解放し、`[first, last)`の範囲の要素のコピーを`*this`にコピーする。
- (2) : `*this`の全ての要素が解放され、`t`オブジェクトの`n`個のコピーから`*this`を再構築する。
- (3) : `*this`の全ての要素を解放し、`x`の全ての要素を`*this`にコピーする。


## 例
```cpp example
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

  // 初期化�リストの代入
  std::deque<int> c3;
  c3.assign({1, 2, 3});

  print("c1", c1);
  print("c2", c2);
  print("c3", c3);
}
```
* assign[color ff0000]
* c.begin()[link begin.md]
* c.end()[link end.md]

### 出力
```
c1 : {1 2 3 }
c2 : {1 1 1 }
c3 : {1 2 3 }
```

## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)


