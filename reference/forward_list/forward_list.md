#コンストラクタ
```cpp
explicit forward_list(const Allocator& = Allocator());
explicit forward_list(size_type n);
forward_list(size_type n, const T& value, const Allocator& = Allocator());
template <class InputIterator>
forward_list(InputIterator first, InputIterator last, const Allocator& = Allocator());
forward_list(const forward_list& x);
forward_list(forward_list&& x);
forward_list(const forward_list& x, const Allocator&);
forward_list(forward_list&& x, const Allocator&);
forward_list(initializer_list<T>, const Allocator& = Allocator());
```
* initializer_list[link /reference/initializer_list.md]

##forward_listオブジェクトの構築

<li>`explicit forward_list(const Allocator& = Allocator());`デフォルトコンストラクタ。アロケータを指定して空のコンテナを作る。計算量： 定数時間
</li><li>`explicit forward_list(size_type n);``n`個の`T()`初期化された要素を保持した`forward_list`オブジェクトを構築する。計算量： `n`に対して線形時間

</li><li>`forward_list(size_type n, const T& value, const Allocator& = Allocator());``value`のコピーを`n`個要素として保持した`forward_list`オブジェクトを構築する。計算量： `n`に対して線形時間
</li><li>`template <class InputIterator>`
`forward_list(InputIterator first, InputIterator last, const Allocator& = Allocator());`[`first, last)`の範囲を要素としてコピーした`forward_list`オブジェクトを構築する。計算量： `[distance`](/reference/iterator/distance.md)(first, last)に対して線形時間
</li><li>`forward_list(const forward_list& x);` コピーコンストラクタ。`x`と同じ要素を保持した`forward_list`オブジェクトを構築する。
</li><li>`forward_list(forward_list&& x);`ムーブコンストラクタ。`x`の指す先を自分の領域として`forward_list`オブジェクトを構築する。
</li><li>`forward_list(const forward_list& x, const Allocator&);`アロケータを指定したコピーコンストラクタ
</li><li>`forward_list(forward_list&& x, const Allocator&);`アロケータを指定したムーブコンストラクタ
</li><li>`forward_list([initializer_list](/reference/initializer_list.md)<T>, const Allocator& = Allocator());`初期化子リストを受け取るコンストラクタ。
</li>



##例

```cpp
#include <iostream>
#include <forward_list>
#include <string>
#include <utility> // move

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
  // デフォルト構築
  std::forward_list<int> ls1;
  print("ls1", ls1);

  // n個の要素を持つリストを作成
  std::forward_list<int> ls2(3);
  print("ls2", ls2);

  // n個の指定された値を要素を持つリストを作成
  std::forward_list<int> ls3(3, 1);
  print("ls3", ls3);

  // 範囲から構築
  std::forward_list<int> ls4(ls3.begin(), ls3.end());
  print("ls4", ls4);

  // コピー構築
  std::forward_list<int> ls5 = ls4;
  print("ls5", ls5);

  // ムーブ構築
  std::forward_list<int> ls6 = std::move(ls5);
  print("ls6", ls6);

  // 初期化子リストで構築
  std::forward_list<int> ls7 = {1, 2, 3};
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

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


