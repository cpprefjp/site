#コンストラクタ
```cpp
explicit list(const Allocator& = Allocator());
list(size_type n, const T& value, const Allocator& = Allocator());
template <class InputIterator>
list(InputIterator first, InputIterator last, const Allocator& = Allocator());
list(const list& x);

// C++11から追加されたコンストラクタexplicit list(size_type n);

list(list&& x);
list(const list& x, const Allocator&);
list(list&& x, const Allocator&);
list(initializer_list<T>, const Allocator& = Allocator());
```

##list オブジェクトの構築

- <b>explicit list(const Allocator& = Allocator());デフォルトコンストラクタ。アロケータを指定して空のコンテナを作る。計算量： 定数時間</b>
- <b>list(size_type n, const T& value, const Allocator& = Allocator());value のコピーを n 個要素として保持した list を構築する。計算量： n に対して線形時間</b>
- <b>template <class InputIterator>list(InputIterator first, InputIterator last, const Allocator& = Allocator());[first, last) の範囲を要素としてコピーした list を構築する。計算量： distance(first, last) に対して線形時間</b>
- <b>list(const list& x);コピーコンストラクタ。x と同じ要素を保持した list を構築する。</b>
- <b>explicit list(size_type n);n 個の T() 初期化された要素を保持した list を構築する。計算量： n に対して線形時間</b>
- <b>list(list&& x);ムーブコンストラクタ。x の指す先を自分の領域として list を構築する。</b>
- <b>list(const list& x, const Allocator&);アロケータを指定したコピーコンストラクタ。</b>
- <b>list(list&& x, const Allocator&);アロケータを指定したムーブコンストラクタ。</b>
- <b>list(initializer_list<T>, const Allocator& = Allocator());初期化子リストを受け取るコンストラクタ。</b>


##例

```cpp
#include <iostream>
#include <list>
#include <string>
#include <utility>  // move

template <class T>
void  print(const std::string& name, const std::list<T>& ls)
{
  std::cout << name << " : ";
  for (const T& x : ls) {
    std::cout << x << " ";
  }
  std::cout << std::endl;
}

int main ()
{
  // デフォルト構築
  std::list<int>  ls1;
  print("ls1", ls1);

  // n 個の要素を持つリストを作成
  std::list<int>  ls2(3);
  print("ls2", ls2);

  // n 個の指定された値を要素に持つリストを作成
  std::list<int>  ls3(3, 1);
  print("ls3", ls3);

  // 範囲から構築
  std::list<int>  ls4(ls3.begin(), ls3.end());
  print("ls4", ls4);

  // コピー構築
  std::list<int>  ls5  =  ls4;
  print("ls5", ls5);

  // ムーブ構築
  std::list<int>  ls6  =  std::move(ls5);
  print("ls6", ls6);

  // 初期化子リストで構築
  std::list<int>  ls7  =  { 1, 2, 3 };
  print("ls7", ls7);
}
```

###出力

```cpp
ls1 : 
ls2 : 0 0 0 
ls3 : 1 1 1 
ls4 : 1 1 1 
ls5 : 1 1 1 
ls6 : 1 1 1 
ls7 : 1 2 3 
```

##参照


