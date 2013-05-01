#代入演算子
```cpp
deque& operator=(const deque& x);

// C++11から
deque& operator=(deque&& y);
deque& operator=(initializer_list<T> init);
```
* initializer_list[link /reference/initializer_list.md]

##概要

- `deque& operator=(const deque& x);`同じテンプレートパラメータを持つ`deque`クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。
- `deque& operator=(deque&& y);`同じテンプレートパラメータを持つ`deque`クラスのオブジェクトをムーブ代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にムーブされる。
- `deque& operator=([initializer_list](/reference/initializer_list.md)<T> init);`同じ要素型を持つ[`initializer_list`](/reference/initializer_list.md)クラスのオブジェクトをコピー代入する。`*this`の全ての要素が解放され、`x`の全ての要素が`*this`にコピーされる。


##戻り値

`*this`

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

  // コピー代入
  std::deque<int> c1;
  c1 = c;

  // ムーブ代入
  std::deque<int> c2;
  c2 = std::move(c);

  // 初期化子リストの代入
  std::deque<int> c3;
  c3 = {1, 2, 3};

  print("c1", c1);
  print("c2", c2);
  print("c3", c3);
}
```

###出力

```cpp
c1 : {1 2 3 }
c2 : {1 2 3 }
c3 : {1 2 3 }
```

##参照


