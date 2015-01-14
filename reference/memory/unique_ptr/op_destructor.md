#デストラクタ (C++11)
```cpp
~unique_ptr();
```

##unique_ptrオブジェクトの破棄
所有権を持つ場合、所有しているリソースを解放する。


##効果
`get()` が `nullptr` でなければ `get_deleter()(get())` を呼び出す。。


##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0
