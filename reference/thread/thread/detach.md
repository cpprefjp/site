#detach(C++11)
```cpp
void detach();
```

##概要
スレッドの管理を手放す


##要件
`thread`オブジェクトにスレッドが関連付けられていること([`joinable()`](./joinable.md)` == true`)。


##効果
`this`に関連付けられていたスレッドはそのまま処理が続行される。またそのスレッドが完了した後には、処理系が同スレッドで利用していたリソース（スレッドローカル変数など）を開放する。一方、この関数を呼び出したスレッドはブロックされない。


##事後条件
`this`は何も指さない空の`thread`オブジェクトとなる。


##例外
detach操作に失敗した場合、[`system_error`](/reference/system_error/system_error.md)例外を投げる。


##備考
detachされたスレッドは、他のスレッドから直接アクセスすることが出来なくなる。ただし、mutexオブジェクトなどを介して間接的に同期することは可能。


##例
```cpp
```

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
