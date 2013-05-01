#コンストラクタ
```cpp
explicit deque(const Allocator& = Allocator());

// C++03まで
deque(size_type n, const T& value = T());

// C++11から
explicit deque(size_type n);
```

// C++11から
deque(size_type n, const T& value, const Allocator& = Allocator());

template <class InputIterator>
deque(InputIterator first, InputIterator last, const Allocator& = Allocator());

deque(const deque& x);

// C++11から
deque(deque&& y);

// C++11から
deque(const deque& x, const Allocator&);

// C++11から
deque(deque&& y, const Allocator&);

// C++11から
deque([initializer_list](/reference/initializer_list.md)<T> init, const Allocator& = Allocator());





##dequeオブジェクトの構築

`deque`コンテナオブジェクトを構築し、コンストラクタの種類に応じて要素を初期化する。

- `explicit deque(const Allocator& = Allocator());`デフォルトコンストラクタ。サイズがゼロで要素を持たない空の`deque`を構築する。計算量： 定数時間
- `explicit deque(size_type n, const T& value= T(), const Allocator& = Allocator());`繰り返しシーケンスコンストラクタ。`value`のコピーを`n`個要素として保持した`deque`を構築する。 計算量： `n`に対して線形時間
- `deque(size_type n);`繰り返しシーケンスコンストラクタ。値初期化されたオブジェクトのコピーを`n`個要素として保持した<code style='font-size:10pt'>deque</code>を構築する。 計算量： <code style='font-size:13px'>n</code>に対して線形時間
- `explicit deque(size_type n, const T& value, const Allocator& = Allocator());`繰り返しシーケンスコンストラクタ。`value`のコピーを`n`個要素として保持した`deque`を構築する。 計算量： `n`に対して線形時間
- `template <class InputIterator>deque(InputIterator first, InputIterator last, const Allocator& = Allocator()); `イテレータ範囲コンストラクタ。<code style='font-size:10pt'>[first, last)</code>の範囲を要素としてコピーした<code style='font-size:10pt'>deque</code>を構築する。計算量： `first`から`last`への距離に対して線形時間
- `deque (const deque& x); `コピーコンストラクタ。`x`と同じ要素を保持した`deque`を構築する。計算量： `x`の要素数に対して線形時間
- `deque(deque&& y);`ムーブコンストラクタ。ムーブセマンティクスを使って`y`の要素でコンテナを構築する。計算量： 定数時間
- `deque (const deque& x, const Allocator&);`コピーコンストラクタ。`x`と同じ要素を保持した`deque`を構築する。計算量： `x`の要素数に対して線形時間 
- `deque (deque&& y, const Allocator&);`ムーブコンストラクタ。ムーブセマンティクスを使って`y`の要素でコンテナを構築する。計算量： 定数時間
- `deque ([initializer_list](/reference/initializer_list.md)<T> init, const Allocator& = Allocator());`初期化子リストで要素を構築するコンストラクタ。`init`と同じ要素を保持した`deque`を構築する。計算量： `init`の要素数に対して線形時間


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
  // デフォルトコンストラクタ
  std::deque<int> c1;

  // 3個の要素を持つコンテナを構築
  std::deque<int> c2(3);

  // 値1の要素を3個持つコンテナを構築
  std::deque<int> c3(3, 1);

  // イテレータの範囲による構築
  std::deque<int> c40 = {1, 2, 3}; // 構築用の一時オブジェクト(説明用)
  std::deque<int> c4(c40.begin(), c40.end());

  // コピー構築
  std::deque<int> c5(c4);

  // ムーブ構築
  std::deque<int> c60 = {1, 2, 3}; // 構築用の一時オブジェクト(説明用)
  std::deque<int> c6(std::move(c60));

  // 初期化子リストによる構築
  std::deque<int> c7 = {1, 2, 3};

  print("c1", c1);
  print("c2", c2);
  print("c3", c3);
  print("c4", c4);
  print("c5", c5);
  print("c6", c6);
  print("c7", c7);
}
```

###出力

```cpp
c1 : {}
c2 : {0 0 0 }
c3 : {1 1 1 }
c4 : {1 2 3 }
c5 : {1 2 3 }
c6 : {1 2 3 }
c7 : {1 2 3 }
```

##参照


