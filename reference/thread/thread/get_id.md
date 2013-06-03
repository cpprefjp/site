#get_id
```cpp
id get_id() const noexcept;
```
* id[link /reference/thread/thread/id.md]


##概要
関連付けられているスレッドのスレッド識別子を取得する。


##戻り値
`thread`オブジェクトがスレッドに関連付けられている場合は、そのスレッドのスレッド識別子。そうでなければデフォルトコンストラクトされた[`thread::id`](/reference/thread/thread/id.md)オブジェクト。


##例外
送出しない。


##例
```cpp
#include <thread>

int main()
{
  std::thread th0;
  assert( th0.get_id() == std::thread::id() );

  std::thread th1([]{ /*...*/ });
  assert( th1.get_id() != std::thread::id() );

  th1.join();
  return 0;
}
```
* get_id[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md):
- [GCC](/implementation#gcc.md):
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.3, 4.7.0
- [ICC](/implementation#icc.md):
- [Visual C++](/implementation#visual_cpp.md):


##参照
